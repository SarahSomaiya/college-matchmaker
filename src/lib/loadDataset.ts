import * as XLSX from "xlsx";

/**
 * Raw row coming from Excel. Properties are loosely typed because the
 * spreadsheet may contain empty cells or unexpected values.
 */
export interface RawCollegeRow {
  [key: string]: any;
}

/**
 * Load the Excel sheet from the public folder and normalise every row.
 *
 * The dataset contains a pipe‑separated `streams` column and separate
 * `examMin` / `examMax` values.  Convert those into strongly‑typed
 * arrays/objects and make sure we never lose a row due to missing data.
 */
export async function loadDataset(): Promise<RawCollegeRow[]> {
  const datasetUrl = `${import.meta.env.BASE_URL}collegeDataset.xlsx`;
  console.log("Loading dataset from", datasetUrl);
  try {
    const response = await fetch(datasetUrl);
    console.log("Fetch response status:", response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    console.log("Array buffer size:", arrayBuffer.byteLength);

    const workbook = XLSX.read(arrayBuffer);
    console.log("Workbook sheets:", workbook.SheetNames);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log("Sheet data:", sheet);

    // use `defval` so empty cells become an empty string instead of undefined
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    console.log("Parsed rows:", rows.length, rows);

    const processedRows = rows.map((row) => {
      const streamsValue = String(row.streams || "");
      const streams = streamsValue
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);

      const examMin = Number(row.examMin);
      const examMax = Number(row.examMax);

      return {
        id: row.__EMPTY || row.id || "", // Use __EMPTY as id if present
        ...row,
        streams,
        examScoreRange: {
          min: isNaN(examMin) ? 0 : examMin,
          max: isNaN(examMax) ? 0 : examMax,
        },
      };
    });
    console.log("Processed rows:", processedRows.length);
    return processedRows;
  } catch (error) {
    console.error("Error loading dataset:", error);
    throw error;
  }
}
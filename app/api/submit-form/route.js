import * as XLSX from "xlsx";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();

    // Path to save admissions.xlsx inside project root
    const filePath = path.join(process.cwd(), "admissions.xlsx");

    let workbook;
    let worksheet;

    try {
      // Try reading existing Excel file
      const fileBuffer = await readFile(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } catch {
      // If file not found, create a new workbook & sheet
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
    }

    // Convert existing data to JSON, add new submission
    const existingData = XLSX.utils.sheet_to_json(worksheet);
    const newData = [...existingData, data];

    // Convert back to sheet
    const newWorksheet = XLSX.utils.json_to_sheet(newData);
    workbook.Sheets["Admissions"] = newWorksheet;

    // Write workbook back to file
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({ message: "Data saved successfully in admissions.xlsx" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
    });
  }
}

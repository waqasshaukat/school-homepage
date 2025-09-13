export const runtime = "nodejs";

import * as XLSX from "xlsx";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();

    // Use /tmp (writable in Vercel) instead of process.cwd()
    const filePath = path.join("/tmp", "admissions.xlsx");

    let workbook;
    let worksheet;

    try {
      const fileBuffer = await readFile(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } catch {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");
    }

    const existingData = XLSX.utils.sheet_to_json(worksheet);
    const newData = [...existingData, data];

    const newWorksheet = XLSX.utils.json_to_sheet(newData);
    workbook.Sheets["Admissions"] = newWorksheet;

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({
        message:
          "Data saved successfully in admissions.xlsx (temporary storage)",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
    });
  }
}

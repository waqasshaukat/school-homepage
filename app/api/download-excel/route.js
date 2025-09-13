export const runtime = "nodejs";

import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join("/tmp", "admissions.xlsx");
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=admissions.xlsx",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "No Excel file found" }), {
      status: 404,
    });
  }
}

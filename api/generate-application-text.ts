import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function POST(request: Request) {
  const { jobTitle, companyName, goodAt, additionalDetails } =
    (await request.json()) as Record<string, string>;

  const prompt = `
  Generate a professional cover letter for a job application with the following details:

    Company: ${companyName}
    Position: ${jobTitle}

    I'm good at: ${goodAt}

    ${additionalDetails ? `Additional Information: ${additionalDetails}` : ""}

    Please create a well-structured, professional cover letter that highlights my relevant skills and experience for this position.
    The letter should be personalized to the company and position, and should not exceed one page.
    Do not include the date or address blocks, just start with "Dear Hiring Manager," and end with a professional closing.
    Max size: 600 characters.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are a professional cover letter writer. You are given a job title, company name, and a list of skills. You are to write a cover letter for the job application.",
      },
      { role: "user", content: prompt },
    ],
    store: false,
  });

  return new Response(response.choices[0].message.content);
}

import { FC, useState, FormEvent, ChangeEvent } from "react";
import copyIconUrl from "../assets/icons/copy-icon.svg";

export const ApplicationAi: FC = () => {
  const [formData, setFormData] = useState({
    jobTitle: "Product manager",
    company: "Apple",
    skills: "HTML, CSS and doing things in time",
    details:
      "I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use.",
  });

  const [charCount, setCharCount] = useState(formData.details.length);
  const maxCharCount = 1200;

  const [generatedText, setGeneratedText] = useState<string | null>(
    `Dear Apple Team,

I am writing to express my interest in the Product Manager position.

My experience in the realm combined with my skills in HTML, CSS and doing things in time make me a strong candidate for this role

I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use.

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`,
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "details") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to generate the application text
    setGeneratedText(`Dear ${formData.company} Team,

I am writing to express my interest in the ${formData.jobTitle} position.

My experience in the realm combined with my skills in ${formData.skills} make me a strong candidate for this role

${formData.details}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`);
  };

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
    }
  };

  return (
    <main style={{ display: "flex", gap: 32, alignItems: "stretch" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "Fixel Display",
            fontSize: 36,
            lineHeight: "45px",
            letterSpacing: "-0.02em",
            color: "#667085",
            paddingBottom: 10,
            borderBottom: "1px #EAECF0 solid",
            marginBottom: 15,
          }}
        >
          Product manager, Apple
        </h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
          onSubmit={handleSubmit}
        >
          <span style={{ display: "inline-flex", gap: 16 }}>
            <label
              style={{
                flex: "1 1 0px",
                display: "flex",
                flexDirection: "column",
                fontWeight: 500,
                marginTop: 1,
                gap: 6,
                fontSize: 14,
                lineHeight: "20px",
                color: "#344054",
              }}
            >
              Job title
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Product manager"
                style={{
                  fontSize: 16,
                  lineHeight: "25px",
                  padding: "7px 11px 6px",
                  borderRadius: 6,
                  border: "1px solid #D0D5DD",
                  boxShadow: "0px 1px 2px 0px #1018280D",
                }}
              />
            </label>
            <label
              style={{
                flex: "1 1 0px",
                display: "flex",
                flexDirection: "column",
                fontWeight: 500,
                marginTop: 1,
                gap: 6,
                fontSize: 14,
                lineHeight: "20px",
                color: "#344054",
              }}
            >
              Company
              <input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Apple"
                style={{
                  fontSize: 16,
                  lineHeight: "25px",
                  padding: "7px 11px 6px",
                  borderRadius: 6,
                  border: "1px solid #D0D5DD",
                  boxShadow: "0px 1px 2px 0px #1018280D",
                }}
              />
            </label>
          </span>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 500,
              marginTop: 1,
              gap: 6,
              fontSize: 14,
              lineHeight: "20px",
              color: "#344054",
            }}
          >
            I am good at...
            <input
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="HTML, CSS and doing things in time"
              style={{
                fontSize: 16,
                lineHeight: "25px",
                padding: "7px 11px 6px",
                borderRadius: 6,
                border: "1px solid #D0D5DD",
                boxShadow: "0px 1px 2px 0px #1018280D",
              }}
            />
          </label>
          <label
            style={{
              flex: "1 1 0px",
              display: "flex",
              flexDirection: "column",
              fontWeight: 500,
              marginTop: 1,
              gap: 6,
              fontSize: 14,
              lineHeight: "20px",
              color: "#344054",
            }}
          >
            Additional details
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="Describe why you are a great fit or paste your bio"
              style={{
                height: 150,
                fontSize: 16,
                lineHeight: "25px",
                padding: "11px 13px 0px",
                borderRadius: 6,
                border: "1px solid #D0D5DD",
                boxShadow: "0px 1px 2px 0px #1018280D",
                resize: "none",
              }}
            />
            <span
              style={{
                fontWeight: 400,
                transform: "translateY(-1px)",
                color: "#475467",
              }}
            >
              {charCount}/{maxCharCount}
            </span>
          </label>
          <button
            type="submit"
            style={{
              border: "none",
              borderRadius: 6,
              padding: "16px 28px",
              fontWeight: 500,
              fontFamily: "Fixel Text",
              fontSize: 18,
              color: "#FFFFFF",
              lineHeight: "28px",
              backgroundColor: "#101828",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </form>
      </div>
      <div
        style={{
          flex: "1 1 0px",
          backgroundColor: "#F2F4F7",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: "1 1 0px",
            padding: 24,
            fontSize: 16,
            lineHeight: "28px",
            color: "#667085",
            whiteSpace: "pre-line",
          }}
        >
          {generatedText ||
            "Your personalized job application will appear here..."}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "24px 24px",
          }}
        >
          <button
            onClick={copyToClipboard}
            style={{
              background: "none",
              padding: 0,
              border: "none",
              fontFamily: "Fixel Text",
              fontWeight: 600,
              color: "#475467",
              fontSize: 16,
              lineHeight: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>Copy to clipboard</span>
            <img height={20} width={20} src={copyIconUrl} alt="Copy" />
          </button>
        </div>
      </div>

      {/* Bottom section with progress */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#F0FDF9",
          padding: "32px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "Fixel Display",
            fontSize: 30,
            lineHeight: "38px",
            color: "#101828",
          }}
        >
          Hit your goal
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: "24px",
            color: "#475467",
            textAlign: "center",
          }}
        >
          Generate and send out couple more job applications to get hired faster
        </p>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0E8D6A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 6,
            padding: "12px 20px",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>+</span> Create New
        </button>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              style={{
                width: 24,
                height: 4,
                borderRadius: 2,
                backgroundColor: index < 3 ? "#101828" : "#D0D5DD",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 14, color: "#667085" }}>3 out of 5</div>
      </div>
    </main>
  );
};

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./CVBuilder.css"
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import "bootstrap/dist/css/bootstrap.min.css";

// PDF Styles
// ... (previous imports)

// PDF Styles - adding certificate specific styles if needed
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 3,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  certificateImage: {
    width: "48%", // Two per row roughly
    height: 200,
    marginBottom: 10,
    objectFit: "contain",
  },
  certificateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

// PDF Component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {data.photo && <Image src={data.photo} style={styles.image} />}
        <Text style={styles.heading}>{data.name}</Text>
        <Text>
          {data.email} | {data.phone}
        </Text>
        <Text>
          {data.linkedin} {data.github ? `| ${data.github}` : ""}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Summary</Text>
        <Text>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Experience</Text>
        <Text>{data.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Projects</Text>
        <Text>{data.projects}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Education</Text>
        <Text>{data.education}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Skills</Text>
        <Text>{data.skills}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Certifications</Text>
        <Text>{data.certifications}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Languages</Text>
        <Text>{data.languages}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Achievements</Text>
        <Text>{data.achievements}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>Portfolio</Text>
        <Text>{data.portfolio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>References</Text>
        <Text>Available upon request.</Text>
      </View>
    </Page>

    {/* New Page for Certificates */}
    {data.certificateImages && data.certificateImages.length > 0 && (
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Certificate Attachments</Text>
        <View style={styles.certificateContainer}>
          {data.certificateImages.map((img, index) => (
            <Image key={index} src={img} style={styles.certificateImage} />
          ))}
        </View>
      </Page>
    )}
  </Document>
);

const CVBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: "",
    projects: "",
    education: "",
    skills: "",
    certifications: "",
    languages: "",
    achievements: "",
    portfolio: "",
    photo: "",
    category: "",
    certificateImages: [], // New field for array of images
  });

  const [submitted, setSubmitted] = useState(false);
  const [apiKeywords, setApiKeywords] = useState([]);

  useEffect(() => {
    axios
      .get("https://gist.githubusercontent.com/mohamedshal/fb06b06a9d30c2c75ca1729f1002db0f/raw")
      .then((response) => {


        if (Array.isArray(response.data.keywords)) {
          setApiKeywords(response.data.keywords.map(kw => kw.toLowerCase())); // ensure lowercase
        } else {
          console.warn("response.data.keywords is not an array");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch API data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
      .then(images => {
        setFormData(prev => ({ ...prev, certificateImages: [...prev.certificateImages, ...images] }));
      })
      .catch(err => console.error("Error loading images", err));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isITCategory = () => {
    const summary = formData.summary.toLowerCase();
    return (
      formData.category === "IT" ||
      apiKeywords.some((kw) => summary.includes(kw))
    );
  };


  const inputFields = [
    "name",
    "email",
    "phone",
    "linkedin",
    ...(isITCategory() ? ["github"] : []), // Only include GitHub if IT
    "summary",
    "experience",
    "projects",
    "education",
    "skills",
    "certifications",
    "languages",
    "achievements",
    "portfolio",
  ];

  // CV Score Logic
  const calculateScore = () => {
    let score = 0;
    const totalWeight = 100;
    const fields = [
      { name: 'name', weight: 10 },
      { name: 'email', weight: 10 },
      { name: 'phone', weight: 10 },
      { name: 'summary', weight: 15 },
      { name: 'experience', weight: 15 },
      { name: 'skills', weight: 15 },
      { name: 'education', weight: 10 },
      { name: 'projects', weight: 10 },
      { name: 'certifications', weight: 5 }
    ];

    fields.forEach(field => {
      if (formData[field.name] && formData[field.name].trim().length > 0) {
        score += field.weight;
      }
    });

    return score;
  };

  const getSuggestions = () => {
    const suggestions = [];
    if (!formData.summary) suggestions.push("Add a professional summary to highlight your goals.");
    if (!formData.experience) suggestions.push("List your work experience to show your track record.");
    if (!formData.skills) suggestions.push("Add relevant skills to match job requirements.");
    if (!formData.projects) suggestions.push("Showcase projects to demonstrate practical knowledge.");
    if (!formData.certifications && formData.certificateImages.length === 0) suggestions.push("Upload or list certifications to validate your expertise.");
    return suggestions;
  };

  const cvScore = calculateScore();
  const cvSuggestions = getSuggestions();

  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container-fluid">
        <div className="cvbuilder">
          <h1 className="mb-4">CV Builder</h1>

          {/* CV Score Dashboard */}
          <div className="card p-3 mb-4 shadow-sm">
            <h3>CV Strength: {cvScore}%</h3>
            <div className="progress mb-3" style={{ height: "25px" }}>
              <div
                className={`progress-bar ${cvScore < 50 ? 'bg-danger' : cvScore < 80 ? 'bg-warning' : 'bg-success'}`}
                role="progressbar"
                style={{ width: `${cvScore}%` }}
                aria-valuenow={cvScore}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {cvScore}%
              </div>
            </div>
            {cvSuggestions.length > 0 && (
              <div className="alert alert-light border">
                <strong>Suggestions to improve:</strong>
                <ul className="mb-0 mt-2">
                  {cvSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Profile Photo Upload */}
            <div className="mb-3">
              <label className="form-label">Profile Photo (optional)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
              />
            </div>

            {/* Certificate Upload */}
            <div className="mb-3">
              <label className="form-label">Certificate Images (optional)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="form-control"
                onChange={handleCertificateUpload}
              />
              <div className="form-text">You can upload multiple certificate images to verify your experience.</div>
              {formData.certificateImages.length > 0 && (
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  {formData.certificateImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Certificate ${idx}`} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  ))}
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="mb-3">
              <label className="form-label">Your Field</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="it"
                    name="category"
                    value="IT"
                    checked={formData.category === "IT"}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="it" className="form-check-label">
                    IT / Software
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="non-it"
                    name="category"
                    value="Non-IT"
                    checked={formData.category === "Non-IT"}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="non-it" className="form-check-label">
                    Non-IT
                  </label>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            {inputFields.map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                {["summary", "experience", "projects", "education", "skills", "certifications", "achievements"].includes(field) ? (
                  <textarea
                    className="form-control"
                    placeholder={`Enter your ${field}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Enter your ${field}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

            <button type="submit" className="btn custom-btn">
              Generate CV
            </button>
          </form>

          {submitted && (
            <div className="mt-5">
              <h2 className="mb-3">CV Preview</h2>
              <div className="card p-3">
                {formData.photo && (
                  <div className="mb-4 text-center">
                    <strong>Profile Photo:</strong>
                    <div>
                      <img
                        src={formData.photo}
                        alt="Profile"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Certificates Preview in HTML */}
                {formData.certificateImages.length > 0 && (
                  <div className="mb-4">
                    <strong>Certificates:</strong>
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {formData.certificateImages.map((img, idx) => (
                        <img key={idx} src={img} alt="Certificate" style={{ width: 100, height: 75, objectFit: 'cover' }} />
                      ))}
                    </div>
                  </div>
                )}

                {inputFields.map((field) => (
                  <div key={field} className="mb-2">
                    <strong className="text-capitalize">
                      {field.replace(/([A-Z])/g, " $1")}:
                    </strong>
                    <p>{formData[field]}</p>
                    <button
                      className="btn btn-sm custom-btn"
                      onClick={() => {
                        const element = document.querySelector(`[name="${field}"]`);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "center" });
                          element.focus();
                        }
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <PDFDownloadLink
                  document={<MyDocument data={formData} />}
                  fileName={`${formData.name}-CV.pdf`}
                  className="btn btn-success mt-3"
                >
                  {({ loading }) => (loading ? "Preparing document..." : "Download as PDF")}
                </PDFDownloadLink>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
};

export default CVBuilder;

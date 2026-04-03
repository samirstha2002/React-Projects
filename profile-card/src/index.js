import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "blue",
  },
  {
    skill: "Javascript",
    level: "advanced",
    color: "Yellow",
  },
  {
    skill: "Git && Github",
    level: "intermediate",
    color: "orange",
  },

  {
    skill: "Web Design",
    level: "advanced",
    color: "red",
  },
  {
    skill: "React",
    level: "intermediate",
    color: "lightgreen",
  },
  {
    skill: "Machine Learning",
    level: "beginner",
    color: "lightblue",
  },
];
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="samir.jpg" alt="samir" />;
}

function Intro() {
  return (
    <div>
      <h1>Samir Shrestha</h1>
      <p>
        Full stack developer and Data scientist. When not coding, i really
        prefer playing video games and watching movies and series in the
        netflix. I am also the student of computer engineering
      </p>
    </div>
  );
}
function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skillObj={skill} />
      ))}
      {/* <Skill color="blue" skill="HTML+CSS" emoji="💪" />
      <Skill color="yellow" skill="JavaScript" emoji="💪" />
      <Skill color="green" skill="Webdesign" emoji="👍" />
      <Skill color="red" skill="Git and Github" emoji="💪" />
      <Skill color="lightblue" skill="React" emoji="👍" />
      <Skill color="red" skill="Machine Learning" emoji="👶" /> */}
    </div>
  );
}
function Skill({ skillObj }) {
  return (
    <div className="skill" style={{ backgroundColor: skillObj.color }}>
      <span>
        {skillObj.skill}{" "}
        {skillObj.level === "advanced"
          ? "💪"
          : skillObj.level === "intermediate"
            ? "👍"
            : "👶"}
      </span>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

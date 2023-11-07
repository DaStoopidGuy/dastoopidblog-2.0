import { FaGithub } from "react-icons/fa";

export default function GithubLink() {
    return (
        <a className="flex items-center hover:underline" href="https://github.com/DaStoopidGuy"
            target="_blank" rel="noopener noreferrer">
            <FaGithub /> DaStoopidGuy
        </a>
    );
}
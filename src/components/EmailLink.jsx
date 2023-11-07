import { IoMailSharp } from 'react-icons/io5';

export default function EmailLink() {
    return (
        <a className="flex items-center" href="mailto:dastoopidguy@protonmail.com?subject=Mail from DaStoopidGuy.com">
            <IoMailSharp />
        </a >
    );
}
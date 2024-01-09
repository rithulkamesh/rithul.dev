import React from "react";
import Link from "@/components/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithubAlt } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="prose">
      <hr />

      <footer className="flex justify-between">
        <span>
          &copy; rithul kamesh {year} |{" "}
          <Link
            href="https://github.com/rithulkamesh/rithul.dev"
            className="dark:text-zinc-300 text-zinc-800"
          >
            source
          </Link>
        </span>
        <div className="flex gap-4">
          <Link href="mailto:hi@rithul.dev">
            <IoMdMailOpen />
          </Link>

          <Link href="https://github.com/rithulkamesh">
            <FaGithubAlt />
          </Link>

          <Link href="https://twitter.com/rithulkamesh">
            <FaXTwitter />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

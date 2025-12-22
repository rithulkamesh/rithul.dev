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

      <footer className="flex justify-between mt-3">
        <span>
          &copy; rithul kamesh {year} |{" "}
          <Link
            href="https://github.com/rithulkamesh/rithul.dev"
            className="text-muted-foreground hover:text-foreground"
            title="source"
          >
            source
          </Link>
        </span>
        <div className="flex gap-4">
          <Link href="mailto:hi@rithul.dev" title="email">
            <IoMdMailOpen />
          </Link>

          <Link href="https://github.com/rithulkamesh" title="github">
            <FaGithubAlt />
          </Link>

          <Link href="https://twitter.com/rithulkamesh" title="twitter">
            <FaXTwitter />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

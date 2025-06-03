import { Template } from "@prisma/client";
import Link from "next/link";

/*
this file is for temperorly testing the generated boilerplate code
*/

type TemplateMinimalInfoProps = {
  template: Template;
};
export function TemplateMinimalInfo({ template }: TemplateMinimalInfoProps) {
  return (
    <Link key={template.id} href={`/templates/${template.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        <div className="font-semibold">{template.type}</div>
        <div className="text-sm text-gray-600 line-clamp-1">
          {template.description}
        </div>
        <div className="text-xs text-gray-500">
          Updated: {template.updatedAt.toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}

type RenderTemplateProps = {
  template: Template;
};
 
export function RenderTemplate({ template }: RenderTemplateProps) {
  return (
    <div className="space-y-2 text-sm">
      <div>
        <strong>Type:</strong> {template.type}
      </div>
      {template.description && (
        <div>
          <strong>Description:</strong> {template.description}
        </div>
      )}
      {template.guide && (
        <div>
          <strong>Guide:</strong>{" "}
          <a
            href={template.guide}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Guide
          </a>
        </div>
      )}
      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <strong className="w-full">Tags:</strong>
          {template.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <div>
        <strong>Created:</strong> {template.createdAt.toLocaleDateString()}
      </div>
      <div>
        <strong>Updated:</strong> {template.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
}

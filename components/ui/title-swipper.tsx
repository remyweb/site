interface SectionTitleProps {
    title: string;
    description?: string;
  }
  
  export function SectionTitle({ title, description }: SectionTitleProps) {
    return (
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-blue-700 dark:text-blue-200 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    );
  }
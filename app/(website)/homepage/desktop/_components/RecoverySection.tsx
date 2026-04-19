import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function NamaSection({ data }: Props) {
  return (
    <section className="section-shell bg-surface-container-high">
      <div className="max-w-5xl mx-auto px-6 text-center section-stack">
        <div className="section-stack-tight">
          <h2 className="type-title font-bold text-primary">{data.recoveryTitle}</h2>
          <div className="flex justify-center">
            <div className="pucuk-rebung-divider" />
          </div>
          <p className="type-body text-on-surface-variant max-w-3xl mx-auto">
            {data.recoveryDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.recoveryItems.map((item) => (
            <div key={item.title} className="bg-white p-8 rounded-3xl shadow-sm">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ${item.wrapper ?? "bg-primary/10 text-primary"}`}
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h4 className="type-body font-bold mb-4">{item.title}</h4>
              <p className="type-body text-on-surface-variant">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function CultureMobile({ data }: Props) {
  return (
    <section className="section-shell-mobile bg-surface">
      <div className="px-6 section-stack text-center">
        <div className="space-y-2">
          <h2 className="type-title font-bold text-primary">
            {data.cultureTitle}
          </h2>

          <div className="flex justify-center">
            <div className="pucuk-rebung-divider-mobile" />
          </div>
        </div>

        <p className="type-body text-on-surface-variant">
          {data.cultureDescription}
        </p>

        <div className="grid grid-cols-1 gap-4 text-left">
          {data.cultureCards.map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-2xl bg-surface-container-high border border-primary/5 flex items-start gap-4"
            >
              <span className="material-symbols-outlined text-secondary">
                {card.icon}
              </span>

              <div>
                <h4 className="type-body font-bold">{card.title}</h4>
                <p className="type-body text-on-surface-variant">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

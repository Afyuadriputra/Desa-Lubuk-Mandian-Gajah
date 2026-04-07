import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function CultureMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface">
      <div className="px-6 space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-bold text-primary">
            {data.cultureTitle}
          </h2>

          <div className="flex justify-center">
            <div className="pucuk-rebung-divider-mobile" />
          </div>
        </div>

        <p className="text-on-surface-variant leading-relaxed">
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
                <h4 className="font-bold">{card.title}</h4>
                <p className="text-sm text-on-surface-variant">
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
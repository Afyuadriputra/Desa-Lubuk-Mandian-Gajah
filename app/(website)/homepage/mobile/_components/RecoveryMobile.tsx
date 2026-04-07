import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function RecoveryMobile({ data }: Props) {
  return (
    <section className="py-16 bg-surface-container-high">
      <div className="px-6 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-headline font-bold text-primary mb-2">
            Upaya Pemulihan
          </h2>

          <div className="flex justify-center mb-6">
            <div className="pucuk-rebung-divider-mobile" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {data.recoveryItems.map((item) => {
            const colorClass =
              item.icon === "compost"
                ? "bg-secondary/10 text-secondary"
                : "bg-primary/10 text-primary";

            return (
              <div
                key={item.title}
                className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
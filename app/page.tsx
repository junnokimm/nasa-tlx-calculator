"use client";

import React, { useState } from "react";
import { useI18n } from "@/app/i18n/LanguageProvider";
import { subscales, pairwises, closeSVG } from "@/app/component/constant";

interface ResultDict {
  tid: number;
  tname: string;
  MD: number;
  PD: number;
  TD: number;
  PF: number;
  EF: number;
  FR: number;
  rScore: number;
  MD_w: number;
  PD_w: number;
  TD_w: number;
  PF_w: number;
  EF_w: number;
  FR_w: number;
  wScore: number;
}

export default function Home() {
  const { t, toggle } = useI18n();

  const [startWeight, setStartWeight] = useState<boolean>(false);

  const [sname, setSname] = useState<string>("");
  const [pname, setPname] = useState<string>("");
  const [tname, setTname] = useState<string>("");
  const [tid, setTid] = useState<number>(1);

  const [weight, setWeight] = useState<{ [id: string]: number }>({
    MD: -1,
    PD: -1,
    TD: -1,
    PF: -1,
    EF: -1,
    FR: -1,
  });

  const [resultDict, setResultDict] = useState<ResultDict[]>([]);

  function getWeight(weightDict: { [id: string]: number }) {
    setWeight(weightDict);
    setStartWeight(false);
  }

  function getScore(scoreDict: { [id: string]: number }) {
    // calculate wScore and rScore
    let wScore: number = 0,
      rScore: number = 0;

    subscales.forEach((id) => {
      wScore = wScore + scoreDict[id] * weight[id];
      rScore = rScore + scoreDict[id];
    });

    wScore = wScore / 15;
    if (wScore < 0) wScore = -1;
    rScore = rScore / 6;

    // append result
    setResultDict([
      ...resultDict,
      {
        tid,
        tname,
        MD: scoreDict["MD"],
        PD: scoreDict["PD"],
        TD: scoreDict["TD"],
        PF: scoreDict["PF"],
        EF: scoreDict["EF"],
        FR: scoreDict["FR"],
        rScore,
        MD_w: weight["MD"],
        PD_w: weight["PD"],
        TD_w: weight["TD"],
        PF_w: weight["PF"],
        EF_w: weight["EF"],
        FR_w: weight["FR"],
        wScore,
      },
    ]);

    setTid(tid + 1);
    window.scroll({ top: 200, left: 0, behavior: "smooth" });
  }

  function handleCSV() {
    const csvHeader = (t("csv.header") as string[]) ?? [];
    const csvData = resultDict.map((value) => [
      pname,
      value.tid,
      value.tname,
      value.MD,
      value.PD,
      value.TD,
      value.PF,
      value.EF,
      value.FR,
      value.rScore,
      value.MD_w,
      value.PD_w,
      value.TD_w,
      value.PF_w,
      value.EF_w,
      value.FR_w,
      value.wScore,
    ]);

    const csvRows = [csvHeader, ...csvData];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sname}_${pname}.csv`;
    link.click();
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full flex flex-row justify-between items-start gap-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50"
            aria-label="toggle language"
          >
            {t("ui.langToggle")}
          </button>

          {/* <a
            href={"https://github.com/Tanimal19/nasa-tlx-calculator"}
            target="_blank"
            rel="noreferrer"
          > */}

          <a
            href={"https://github.com/junnokimm/nasa-tlx-calculator"}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="size-8"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 lg:flex-row justify-start border-b-2 pb-6">
        <p className="flex-1 max-w-96">
          <a
            className="text-blue-500 hover:underline"
            href="https://humansystems.arc.nasa.gov/groups/tlx/"
            target="_blank"
            rel="noreferrer"
          >
            NASA-TLX
          </a>{" "}
          {t("intro")}
        </p>

        <ul className="pl-4 list-disc flex-1 lg:w-[32rem]">
          <li>
            <p>
              <strong>{t("ui.reweight")}</strong> {t("bullets.reweightTitle")}
            </p>
            <p>{t("bullets.reweightNote")}</p>
          </li>
          <li>
            <p>
              <strong>{t("ui.reset")}</strong> {t("bullets.resetTitle")}
            </p>
            <p>{t("bullets.resetNote")}</p>
          </li>
        </ul>
      </div>

      {startWeight ? (
        <div className="z-10 absolute top-20 p-4 bg-[var(--background-color)] rounded-xl border-2">
          <div className="flex flex-row justify-between items-start">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {t("ui.setWeight")}
            </h2>
            <button
              className="rounded hover:bg-pink-200"
              type="button"
              onClick={() => setStartWeight(false)}
            >
              {closeSVG}
            </button>
          </div>
          <WeightForm sendToParent={getWeight} />
        </div>
      ) : null}

      <div className="pl-8 flex flex-col items-center md:items-start xl:flex-row">
        <div className="flex flex-col py-6 xl:pr-12">
          <div className="flex flex-row justify-start gap-8 items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {t("ui.task")} {tid}
            </h2>
            <TextInput
              placeholder={t("ui.taskName")}
              key={tid}
              handler={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTname(e.currentTarget.value);
              }}
            />
          </div>
          <ScoreForm sendToParent={getScore} />
        </div>

        <div className="flex flex-col gap-4 w-[28rem] py-6 xl:px-8">
          <h2 className="text-xl font-bold text-gray-800 pr-4">
            {t("ui.studySetting")}
          </h2>

          <TextInput
            placeholder={t("ui.studyName")}
            handler={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSname(e.currentTarget.value);
            }}
          />

          <TextInput
            placeholder={t("ui.participantName")}
            handler={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPname(e.currentTarget.value);
            }}
          />

          <div className="w-fit my-2">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex flex-row gap-2 cursor-pointer items-center -ml-6">
                <span className="-rotate-90 shrink-0 transition duration-300 group-open:rotate-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <h2 className="text-xl font-bold text-gray-800 pr-4">
                  {t("ui.currentWeight")}
                </h2>

                <div className="flex-1 inline-flex justify-end">
                  <Button
                    type="button"
                    placeholder={t("ui.reweight")}
                    handler={() => {
                      setStartWeight(true);
                      window.scroll({ top: 20, left: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              </summary>
              <WeightTable {...weight} />
            </details>
          </div>

          <div className="w-fit mb-2">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex flex-row gap-2 cursor-pointer items-center -ml-6">
                <span className="-rotate-90 shrink-0 transition duration-300 group-open:rotate-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <h2 className="text-xl font-bold text-gray-800 pr-4">
                  {t("ui.taskResult")}
                </h2>

                <div className="flex-1 flex gap-4 justify-end">
                  <Button
                    type="button"
                    placeholder={t("ui.reset")}
                    handler={() => {
                      setResultDict([]);
                      setTid(1);
                    }}
                  />
                  <Button
                    type="button"
                    placeholder={t("ui.downloadCsv")}
                    handler={handleCSV}
                  />
                </div>
              </summary>
              <ScoreTable data={resultDict} />
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}

// Components
interface BtnProps {
  type?: "button" | "submit" | "reset";
  placeholder: string;
  handler?: Function;
}
function Button({ type, placeholder, handler }: BtnProps) {
  return (
    <span className="h-fit w-fit inline-flex -space-x-px overflow-hidden rounded-md bg-slate-950">
      <button
        type={type}
        onClick={
          handler
            ? () => {
                handler();
              }
            : undefined
        }
        className="inline-block px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white hover:bg-slate-700 focus:relative"
      >
        {placeholder}
      </button>
    </span>
  );
}

interface TextInputProps {
  placeholder: string;
  handler?: Function;
}
function TextInput({ placeholder, handler }: TextInputProps) {
  return (
    <label className="max-w-64 relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
      <input
        type="text"
        onInput={
          handler
            ? (e) => {
                handler(e);
              }
            : undefined
        }
        placeholder={placeholder}
        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      />

      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
        {placeholder}
      </span>
    </label>
  );
}

interface ChildProps {
  sendToParent: Function;
}

// Weight
function WeightForm({ sendToParent }: ChildProps) {
  const { t } = useI18n();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const weightDict: { [id: string]: number } = {
      MD: 0,
      PD: 0,
      TD: 0,
      PF: 0,
      EF: 0,
      FR: 0,
    };

    //value는 항상 ID(MD/PD/...)로 저장되게 구성
    pairwises.forEach((pairKey) => {
      const picked = formJson[pairKey]?.toString() as keyof typeof weightDict;
      if (picked && picked in weightDict) weightDict[picked] += 1;
    });

    sendToParent(weightDict);
  }

  const pairList = pairwises.map((pairKey) => {
    const [op1, op2] = pairKey.split("-");
    return (
      <SelectWeight
        key={pairKey}
        id={pairwises.indexOf(pairKey) + 1}
        name={pairKey}
        op1={op1}
        op2={op2}
      />
    );
  });

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="max-w-[24em] xl:max-w-none xl:w-fit flex flex-col items-start"
    >
      <p className="text-left text-gray-700 pb-2">{t("weight.instruction")}</p>
      <div className="grid grid-flow-row xl:grid-flow-col xl:grid-rows-5">
        {pairList}
      </div>
      <div className="w-full flex flex-row gap-6 justify-end pt-4">
        <Button type="submit" placeholder={t("ui.submit")} />
      </div>
    </form>
  );
}

interface SelectWeightProps {
  id: number;
  name: string;
  op1: string; // MD/PD/...
  op2: string; // MD/PD/...
}
function SelectWeight({ id, name, op1, op2 }: SelectWeightProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-row items-center px-2 py-1 rounded-xl hover:bg-slate-100">
      <p className="mr-2 text-sm">{id}.</p>
      <fieldset className="grid grid-cols-2 gap-4 my-2">
        <div>
          <label className="text-center w-36 block cursor-pointer rounded-lg border border-gray-100 bg-white px-2 py-1 text-sm font-medium  hover:border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
            <div>
              <p className="text-gray-700 text-xs">{t(`subscale.${op1}`)}</p>
            </div>

            <input
              type="radio"
              name={name}
              value={op1}
              className="sr-only"
              required
            />
          </label>
        </div>

        <div>
          <label className="text-center w-36 block cursor-pointer rounded-lg border border-gray-100 bg-white px-2 py-1 text-sm font-medium hover:border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
            <div>
              <p className="text-gray-700 text-xs">{t(`subscale.${op2}`)}</p>
            </div>

            <input type="radio" name={name} value={op2} className="sr-only" />
          </label>
        </div>
      </fieldset>
    </div>
  );
}

function WeightTable(data: { [id: string]: number }) {
  const { t } = useI18n();
  const nanText = t("ui.nan");

  return (
    <div className="my-4 flex flex-row gap-6 items-end">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {subscales.map((id) => (
                <th
                  key={id}
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                >
                  {id}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            <tr>
              {subscales.map((id) => (
                <td
                  key={id}
                  className="whitespace-nowrap px-4 py-2 text-gray-700"
                >
                  {data[id] === -1 ? nanText : data[id].toString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Score
function ScoreForm({ sendToParent }: ChildProps) {
  const { t } = useI18n();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const scoreDict: { [id: string]: number } = {
      MD: 0,
      PD: 0,
      TD: 0,
      PF: 0,
      EF: 0,
      FR: 0,
    };

    subscales.forEach((id) => {
      scoreDict[id] = parseInt(formJson[id]?.toString() ?? "0", 10);
    });

    sendToParent(scoreDict);
  }

  return (
    <div className="w-fit">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col items-start"
      >
        <div className="grid grid-flow-row md:grid-flow-col md:grid-rows-3 gap-4">
          {subscales.map((id) => (
            <ScoreSlider
              key={id}
              title={t(`slider.${id}.title`)}
              question={t(`slider.${id}.q`)}
              name={id}
              head={t(`slider.${id}.head`)}
              tail={t(`slider.${id}.tail`)}
            />
          ))}
        </div>

        <div className="w-full flex flex-row gap-6 justify-end pt-4">
          <Button type="submit" placeholder={t("ui.submit")} />
        </div>
      </form>
    </div>
  );
}

interface ScoreSliderProps {
  title: string;
  question: string;
  name: string;
  head: string;
  tail: string;
}
function ScoreSlider({ title, question, name, head, tail }: ScoreSliderProps) {
  const [value, setValue] = useState<number>(50);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(parseInt(e.currentTarget.value, 10));
  }

  return (
    <div className="w-96 flex flex-col items-start gap-4 py-4">
      <p className="w-full inline-flex justify-center text-gray-900">{title}</p>
      <p className="w-full text-sm text-gray-600">{question}</p>

      <div className="flex flex-row gap-8">
        <div className="flex flex-col items-center gap-2">
          <input
            type="range"
            name={name}
            min="0"
            max="100"
            step="5"
            list="markers"
            onChange={handleChange}
            className="w-72 accent-blue-500"
          />
          <datalist id="markers">
            <option value="0"></option>
            <option value="20"></option>
            <option value="40"></option>
            <option value="60"></option>
            <option value="80"></option>
            <option value="100"></option>
          </datalist>
          <div className="w-72 flex flex-row justify-between">
            <p className="text-xs text-gray-600">{head}</p>
            <p className="text-xs text-gray-600">{tail}</p>
          </div>
        </div>
        <p className="w-10">{value}</p>
      </div>
    </div>
  );
}

interface ScoreTableProps {
  data: ResultDict[];
}
function ScoreTable({ data }: ScoreTableProps) {
  const { t } = useI18n();
  const nanText = t("ui.nan");

  return (
    <div className="mt-4 w-fit max-w-full overflow-clip rounded-lg border border-gray-200">
      <table className="divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
              {t("ui.task")}
            </th>
            {subscales.map((id) => (
              <th
                key={id}
                className="whitespace-nowrap px-2 py-2 font-medium text-gray-900"
              >
                {id}
              </th>
            ))}
            <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
              r-score
            </th>
            <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
              w-score
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((dict) => (
            <tr key={dict.tid}>
              <td className="overflow-hidden whitespace-nowrap text-ellipsis max-w-20 px-2 py-2 font-medium text-gray-900">
                {dict.tname}
              </td>
              {subscales.map((id) => (
                <td key={id} className="whitespace-nowrap px-2 py-2 text-gray-700">
                  {(dict as any)[id]}
                </td>
              ))}
              <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                {dict.rScore.toFixed(4)}
              </td>
              <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                {dict.wScore === -1 ? nanText : dict.wScore.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

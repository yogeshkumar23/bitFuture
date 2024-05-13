import React from "react";
// import * as IntroJS from "intro.js-react";
// import "intro.js/introjs.css";

export const IntroJSConfig = ({
  name,
  // steps = [],
  // hints = [],
}: Intro_JS.props) => {
  const initialStep = React.useMemo(
    () => +(localStorage.getItem(`${name}StepsIndex`) || ""),
    [localStorage.getItem(`${name}StepsIndex`)]
  );
  const stepsEnabled = React.useMemo(
    () => !Boolean(localStorage.getItem(`${name}Steps`)),
    [localStorage.getItem(`${name}Steps`)]
  );

  const hintsEnabled = React.useMemo(
    () => !Boolean(localStorage.getItem(`${name}Hints`)),
    [localStorage.getItem(`${name}Hints`)]
  );

  const handleStepsIndex = (index: number) => {
    if (initialStep < index)
      localStorage.setItem(`${name}StepsIndex`, index.toString());
  };
  const handleStepsEnable = () => localStorage.setItem(`${name}Steps`, "true");
  const handleHintsEnable = () => localStorage.setItem(`${name}Hints`, "true");

  return import.meta.env.MODE === "developement" ? (
    <>
      {/* {steps?.length ? (
        <IntroJS.Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={handleStepsEnable}
          onChange={handleStepsIndex}
        />
      ) : null}
      {hints?.length ? (
        <IntroJS.Hints
          enabled={hintsEnabled}
          hints={hints}
          onClose={handleHintsEnable}
        />
      ) : null} */}
    </>
  ) : (
    <></>
  );
};

export declare namespace Intro_JS {
  export interface props {
    name: string;
    // steps?: IntroJS.Step[];
    // hints?: IntroJS.Hint[];
  }
}

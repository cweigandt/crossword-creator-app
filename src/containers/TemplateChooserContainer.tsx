import { useCallback } from "react";
import TemplatePreviewGrid from "../components/grid/TemplatePreviewGrid";
import templates from "../data/prepared-templates.json";
import { PuzzleType, TemplateType } from "../data/types/PuzzleTypes";

import "../styles/containers/TemplateChooserContainer.css";
import { useDispatch } from "react-redux";
import puzzleSlice from "../reducers/puzzleSlice";

type ImportedTemplate = Pick<PuzzleType, "width" | "height" | "template">;

const TemplateChooserContainer = () => {
  const dispatch = useDispatch();
  const handleTemplateClicked = useCallback(
    (template: TemplateType) => {
      dispatch(puzzleSlice.actions.updateTemplate(template));
    },
    [dispatch]
  );

  return (
    <div className="template-chooser-container">
      <div className="template-chooser-title">Premade Templates</div>
      {templates.map((template: ImportedTemplate, index) => (
        <div className="template-container" key={index}>
          <TemplatePreviewGrid
            template={template.template}
            onClick={handleTemplateClicked}
          />
        </div>
      ))}
    </div>
  );
};

export default TemplateChooserContainer;

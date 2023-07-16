'use client'
import { useState } from "react";
import { AnswerInputType, Category, QuestionType } from '../../../../utils/question.types';
import Select from "@/components/select/Select";
import Button from "@/components/buttons/button/Button";

export default function QuestionsListPage() {

  const [questionType, setQuestionType] = useState<QuestionType>();
  const [subType, setSubType] = useState<Category>();
  const [predictor, setPredictor] = useState(false);
  const [format, setFormat] = useState<AnswerInputType>();
  const [questionText, setQuestionText] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);

  const handleSave = () => {
    
  }
  
  return (
    <div className="text-[#344767]">
      <Button onClick={handleSave}>save</Button>
      <div className="flex flex-row gap-2">
        <div>
          <div>Question type</div>
          <Select 
            value={questionType} 
            onChange={setQuestionType} 
            options={["BIO" , "PREF" , "Predictors"]} 
            disabledOption={"Type"} />
        </div>

        <div>
          <div>sub type</div>
          <Select 
            value={subType} 
            onChange={setSubType} 
            options={['Personal details', 'Basics', 'Identity', 'Background', 'Looks', 'Lifestyle', 'Family', 'Communication']}
            disabledOption={"Sub Type"} />
        </div>

        <div>
          <div>format</div>
          <Select 
            value={format} 
            onChange={setFormat} 
            options={['text' , 'number' , 'singleTextChoice' , 'singleButtonChoice' , 'multiTextChoice' , 'datePicker' , 'range' , 'scale' , 'continuum' , 'dichotomous' , 'dragAndDrop' , 'allocation' , 'selector' , 'location' , 'imagePicker']}
            disabledOption={"format"} />
        </div>
      </div>
    </div>
  )
}

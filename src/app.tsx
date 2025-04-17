import { Button, Rows, Text ,MultilineInput  } from "@canva/app-ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { addElementAtPoint } from "@canva/design";
import { Font, requestFontSelection } from "@canva/asset";
import * as React from "react";
import { useState } from "react";
import cat from "assets/images/datas.png"
import { useFeatureSupport } from "utils/use_feature_support";
export const DOCS_URL = "https://www.canva.dev/docs/apps/";

export const App = () => {
  const [responseBody, setResponseBody] = useState<unknown | undefined>(
    undefined,
  );
  const [selectedFont, setSelectedFont] = React.useState<Font | undefined>();
  const [webdat, setwebdat] = useState<string| undefined>('hi');

  const isSupported = useFeatureSupport();

  const onClick = async () => {
    await addElementAtPoint({
      type: "text",
      children: [" 0% "],
      color: "#e10d0d",
      width: 138.5,
      fontSize: 29.3,
      textAlign: "center",
      top: 276.3,
      left: 136.9,
      fontRef: selectedFont?.ref
    });


    /////////////
  };
  const loadata = async () => {
    try {
      const response = await fetch(cat);
      
      const json = await response.json();
    console.log(json);
    //setwebdat(json['hello'])
    } catch (err) {
      console.error(err);     
    }
    setwebdat("")
  }

  const setfont = async () => {
    const fontResponse = await requestFontSelection({
      selectedFontRef: selectedFont?.ref, // Specify the selected font, if one is defined
    });

    if (fontResponse.type !== "completed") {
      return;
    }
    setSelectedFont(fontResponse.font);
  }


  const intl = useIntl();
  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>{selectedFont?.name}</Text>
        <Text>
          <FormattedMessage
            defaultMessage="แอพสำหรับกรอกข้อมูลรุนแรง"
            description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
            values={{
              code: (chunks) => <code>{chunks}</code>,
            }}
          />
        </Text>
        <Button variant="primary" onClick={onClick} stretch>
          {intl.formatMessage({
            defaultMessage: "เพิ่มข้อมูลกรณี",
            description:
              "กรณี",
          })}
        </Button>
        <Button variant="primary" onClick={setfont} stretch>
          {intl.formatMessage({
            defaultMessage: "เลือกฟอนต์",
            description:
              "กรณี",
          })}
        </Button>
        <MultilineInput onChange={(r) => {setwebdat(r)}} value={webdat}>
        </MultilineInput>
        <Text>
          {webdat}
        </Text>
        <Button variant="primary" onClick={loadata} stretch>
          {intl.formatMessage({
            defaultMessage: "โหลดไฟล์",
            description:
              "กรณี",
          })}
        </Button>
      </Rows>
    </div>
  );
};

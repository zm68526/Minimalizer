// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import {FileTrigger} from 'react-aria-components';
import {Text} from 'react-aria-components';
import {DropZone} from '@react-spectrum/dropzone'
import { IllustratedMessage } from "@adobe/react-spectrum";
import {Heading} from '@adobe/react-spectrum'
import {Content} from '@adobe/react-spectrum'
import { ReactMediaRecorder } from "react-media-recorder";
import SoundCard from "./SoundCard";
import BoopButton from "./BoopButton"

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React, { useState } from "react";
import "./App.css";

const App = ({ addOnUISdk }) => {
    const [buttonLabel, setButtonLabel] = useState("Click me");
    const [isFilled, setIsFilled] = React.useState("Nothing dropped");
    const [imageURL, setImageURL] = useState('https://avatars.githubusercontent.com/u/359935?v=4');

    async function query(data) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const result = await response.blob();
        return result;
      }
    
      const handlerFunction = () => {
        query({"inputs": "Black and white professional-looking minimalist logo depicting a Astronaut riding a horse"}).then((response) => {
          let tempURL = URL.createObjectURL(response);
          setImageURL(tempURL);
        });
      }


    function handleClick() {
        setButtonLabel("Clicked");
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
            <img src={imageURL} className="App-logo" alt="logo" />
                <Button size="m" onClick={handleClick}>
                    {buttonLabel}
                </Button>
                <DropZone
                    maxWidth="size-3000"
                    isFilled={isFilled}
                    onDrop={(e)=> {
                        const droppedFiles = event.dataTransfer.files;
                        console.log('Dropped files:', droppedFiles[0].name); }
                    }>
                    <IllustratedMessage>
                        <Heading>
                            <Text slot="label">
                            {isFilled}
                            </Text>
                        </Heading>
                        <Content>
                            <FileTrigger
                                onSelect={(e)=> {
                                    let file = (Array.from(e)).find((file) => file.type === 'image/jpeg');
                                    if (file) setIsFilled(file.name) }
                                }>
                                <Button variant="primary">Browse</Button>
                            </FileTrigger>
                        </Content>
                    </IllustratedMessage>
                </DropZone>
                <BoopButton handlerr={handlerFunction}/>
            </div>
        </Theme>
    );
};

export default App;
import { type Presentation } from "./types/presentationTypes";
import { type Slide } from "./types/presentationTypes";
import { type TextObject } from "./types/presentationTypes";
import { type ImageObject } from "./types/presentationTypes";

import { type Editor } from "./types/editorTypes";

const elem1: ImageObject = {
    type: "image",
    src: "data:image/jpg;base64,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",
    id: "1",
    position: {
        x: 80,
        y: 230,
    },
    size: {
        width: 150,
        height: 150
    }
}
const elem2: TextObject = {
    type: "text",
    value: "It is New text",
    fontFamily: "Montserrat",
    fontSize: 30,
    fontWeight: 400,
    fontColor: "#ff0000",
    id: "2",
    position: {
        x: 180,
        y: 200,
    },
    size: {
        width: 200,
        height: 100
    }
}
const elem3: TextObject = {
    type: "text",
    value: "Another New text",
    fontFamily: "Arial",
    fontSize: 30,
    fontWeight: 700,
    fontColor: "#000000",
    id: "3",
    position: {
        x: 130,
        y: 100,
    },
    size: {
        width: 200,
        height: 100
    }
}

const elem4: ImageObject = {
    type: "image",
    src: "",
    id: "4",
    position: {
        x: 30,
        y: 430,
    },
    size: {
        width: 150,
        height: 150
    }
}
const elem5: TextObject = {
    type: "text",
    value: "New text!!",
    fontFamily: "Montserrat",
    fontSize: 30,
    fontWeight: 400,
    fontColor: "#ff0000",
    id: "5",
    position: {
        x: 300,
        y: 50,
    },
    size: {
        width: 200,
        height: 100
    }
}
const elem6: TextObject = {
    type: "text",
    value: "Another text",
    fontFamily: "Arial",
    fontSize: 30,
    fontWeight: 400,
    fontColor: "#00FF00",
    id: "6",
    position: {
        x: 200,
        y: 500,
    },
    size: {
        width: 200,
        height: 100
    }
}
const elem7: ImageObject = {
    type: "image",
    src: "",
    id: "7",
    position: {
        x: 270,
        y: 130,
    },
    size: {
        width: 80,
        height: 80
    }
}
const slide1: Slide = {
    id: "1",
    background: {
        type: "image",
        src: ""
    },
    objects: [elem3, elem2, elem1, elem7]
}
const slide2: Slide = {
    id: "2",
    background: {
        type: "solid",
        color: "#ffff00"
    },
    objects: [elem4, elem5, elem6]
}
const slide3: Slide = {
    id: "3",
    background: {
        type: "solid",
        color: "#00ff00"
    },
    objects: []
}
const slide4: Slide = {
    id: "4",
    background: {
        type: "solid",
        color: "#ff0000"
    },
    objects: []
}
const slide5: Slide = {
    id: "5",
    background: {
        type: "solid",
        color: "#ff00ff"
    },
    objects: []
}
const presentation: Presentation = {
    title: "project1",
    slides: [slide1, slide2, slide3, slide4, slide5]
}
// const slideSelection: SlideSelection = ["1","2"]

// const elementSelection: ElementSelection = ["4","5"]

const editor: Editor = {
    presentation: presentation,
    slideSelection: ["1", "2"],
    elementSelection: ["5"],
    interfaceState: {
        optionsBarState: "file",
        editBarState: "no-edit",
        buffer: false
    }
}

export {
    editor
}
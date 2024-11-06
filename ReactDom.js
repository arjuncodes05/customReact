function render(reactElement, rootElement){ 
    
    // to create an html element
    function createDOMElement(reactElement){
        if(reactElement === undefined) return     

        const {type, props} = reactElement        
        const DOMElement = document.createElement(type);
        
        if(props === undefined || props.children === undefined) return 

        // adding attributes
        Object.entries(props).map((prop) => {                 
            if(prop[0] === 'children'){  // since children also inside the props,            
                props.children.forEach((child) => {                                        
                    if(typeof child === 'string' || typeof child === 'number'){   // if child is a string
                        const textNode = document.createTextNode(child)
                        DOMElement.append(textNode)
                    } else if (Array.isArray(child)){
                        const textNode = document.createTextNode(child[0])
                        DOMElement.append(textNode)
                    } else {   // if child is a another jsx (recusrive call)
                        let childDOMElement = createDOMElement(child)
                        DOMElement.append(childDOMElement)
                    }
                })
            } else if(prop[0] === 'style'){ // style is an object itself, so we treat it differently
                Object.entries(prop[1]).map((p) => {
                    DOMElement.style[p[0]] = p[1]
                }) 
            } else {
                DOMElement.setAttribute(prop[0], prop[1])
            }  
        })        
        return DOMElement
    }

    if(Array.isArray(reactElement)){                
        let all = reactElement.map((el) => {                        
             return createDOMElement(el)
        })
        console.log(all);
        
        all.map((a) => {
            rootElement.append(a)
        })
        
    } else {
        const DOMElement = createDOMElement(reactElement)
        rootElement.append(DOMElement)
    }
}

export default {render}
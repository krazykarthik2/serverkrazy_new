import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormControl, FormFloating, FormGroup } from "react-bootstrap";
function Floating_Control_Label({ type = "text", className = "", id, label, placeholder ,value,onChange,autoCOmplete }) {
    return <>
        <FormGroup controlId={id}>

            <FormFloating >
                <FormControl  {...{value,onChange,type,className,autoComplete}} />
                <FloatingLabel>{label}</FloatingLabel>
            </FormFloating>
        </FormGroup>

    </>
}
function Floating_Password_Label({ className = "", id, label, placeholder, autoComplete = "current-password",value,onChange }) {
    const [show, setShow] = useState(false);
    return <>
        <FormGroup controlId={id}>

            <FormFloating >
                <div className="hstack">
                    <FormControl type={show ? "text" : "password"} className={"w-100 " + className} {...{placeholder,autoComplete,value,onChange}} />
                    <button onClick={() => setShow(e => !e)} className="d-inline">
                        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
                    </button>
                </div>
                <FloatingLabel>{label}</FloatingLabel>
            </FormFloating>
        </FormGroup>

    </>
}
export { Floating_Control_Label,Floating_Password_Label };

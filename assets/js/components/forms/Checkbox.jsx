import React from 'react';

const Checkbox = ({name, label, value, handleChecked, placeholder = "", type = "text", error = ""}) =>
    (
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input"
                   onChange={handleChecked}
                   value={value}
                   id={id}
                   checked
            />
            <label className="custom-control-label" htmlFor={extra.id}>{extra.title}ss</label>
        </div>
    );
export default Checkbox;
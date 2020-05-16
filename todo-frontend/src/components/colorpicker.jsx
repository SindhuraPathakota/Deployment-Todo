import React  from 'react';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

function ColorPicker ({parentCallback})  {
    const [color,setColor] = useState('#fff')
    const [showColorPicker,setShowcolorPicker] = useState(false)
    return(
   <React.Fragment>
    <button className="btn btn-outline-success" style={{flex: '10', padding: '5px',margin : '15px'}} onClick={() => setShowcolorPicker(showColorPicker => !showColorPicker)}>
    {showColorPicker ? ' Close Color Picker' : 'Pick a Color'}</button>
   {  showColorPicker && <SketchPicker color={color} onChange={
       updatedcolor => parentCallback(updatedcolor.hex)} />}
   </React.Fragment>
    );
}

export default ColorPicker;
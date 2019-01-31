import React from 'react';

const Message = ({ message, text }) => {
 return (
   <blockquote>
     <h3>{text}</h3>
     <p>{message}</p>
   </blockquote>
 );
};

export default Message;

import React from 'react'

function Index({AllUsers}) {
    
    console.log("Getting users in the front end",AllUsers);
    return (
        <>
        <h3>
        {AllUsers.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                  </div>
                ))}    
        </h3>  
        </>
    )
}

export default Index

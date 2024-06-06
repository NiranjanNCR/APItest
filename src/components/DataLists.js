

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, Container, } from '@mui/material';  // imported all the required UI materials here.

const DataList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    //   API calling here
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

//   Search function to handle the event :
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

//   Using filter method for data listing
  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 variant="h4" gutterBottom>All Content is listed:</h1>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <List>
      {/* Map Method is used for the data display on the interface from API */}
        {filteredData.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={item.body} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DataList;

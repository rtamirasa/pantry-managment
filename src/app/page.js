
"use client";
import React, { useState } from 'react';
import { Button, Box, Stack, Typography, Modal, TextField, Card, CardContent, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import AddItemWithRecognition from './AddItemWithRecognition';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CameraComponent from './camera';
import { firestore } from '@/app/firebase';
import { collection, query, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import '@fontsource/roboto';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};




export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewInventory, setViewInventory] = useState(false);
  const [itemName, setItemName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ id: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await setDoc(docRef, {});
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    await updatePantry();
  };

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" bgcolor="#121212" color="#fff" fontFamily="'Roboto', sans-serif">
      <Typography variant="h4" sx={{ my: 4 }}>
        Welcome to Pantry Manager
      </Typography>

      <Box sx={{ my: 4, p: 2, border: '1px solid #fff', borderRadius: '8px', fontFamily: 'Roboto, sans-serif' }}>
        <Typography variant="h6">
          A new type of management for pantries.
        </Typography>
      </Box>

      <Box width="80%" display="flex" justifyContent="space-around" mb={4}>
        <Box textAlign="center">
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h4">{pantry.length}</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">Total Items</Typography>
          <Typography variant="h4">15</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">Low Stock Items</Typography>
          <Typography variant="h4">1</Typography>
        </Box>
      </Box>

      <Grid container spacing={2} width="80%" justifyContent="center" mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#333' }}>
            <CardContent>
              <Button fullWidth variant="contained" onClick={handleOpen} sx={{ bgcolor: '#007BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AddCircleOutlineIcon sx={{ mr: 1 }} />
                Add New Item
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#333' }}>
            <CardContent>
              <Button fullWidth variant="contained" onClick={() => setViewInventory(!viewInventory)} sx={{ bgcolor: '#6C757D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Inventory2OutlinedIcon sx={{ mr: 1 }} />
                {viewInventory ? 'Hide Inventory' : 'View Inventory'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#333' }}>
            <CardContent>
              <Button fullWidth variant="contained" sx={{ bgcolor: '#28A745', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InsightsOutlinedIcon sx={{ mr: 1 }} />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#333' }}>
            <CardContent>
              <Button fullWidth variant="contained" sx={{ bgcolor: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
                Shopping List
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <AddItemWithRecognition onCapture={setItemName} />
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {viewInventory && (
        <Card sx={{ width: '80%', bgcolor: '#f8f9fa', color: '#000', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" mb={3}>
              Pantry Items
            </Typography>
            {pantry.map((i) => (
              <Stack
                key={i.id}
                direction={'row'}
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                p={2}
                bgcolor="#e9ecef"
                borderRadius={2}
              >
                <Typography variant="h6">
                  {i.id ? i.id.charAt(0).toUpperCase() + i.id.slice(1) : 'Unnamed Item'}
                </Typography>
                <Button variant="contained" color="error" onClick={() => removeItem(i.id)}>
                Remove
              </Button>
            </Stack>
          ))}
        </CardContent>
      </Card>
    )}
  </Box>
);
}

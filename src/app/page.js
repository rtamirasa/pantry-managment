'use client';
import { Button, Box, Stack, Typography, Modal } from '@mui/material';
import { firestore } from '@/app/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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
}


export default function Home() {
  const [pantry, setPantry] = useState([]); // Initialize state correctly
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push({ id: doc.id, ...doc.data() }); // Create objects with id and data
        console.log(doc.id, doc.data());
      });
      setPantry(pantryList);
      console.log(pantryList);
    };

    updatePantry();
  }, []);

  return (
    <Box
      width="100vw"
      height="150vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style = {style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Box border="1px solid #333"></Box>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <Typography variant="h2" color="#333" textAlign="center">
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {pantry.map((i) => (
            <Box
              key={i.id}
              width="100%"
              height="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#f0f0f0"
            >
              <Typography variant="h5" color="#333" textAlign="center">
                {i.id ? i.id.charAt(0).toUpperCase() + i.id.slice(1) : 'Unnamed Item'}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

'use client';
import { Box, Stack, Typography } from '@mui/material';
import { firestore } from '@/app/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Home() {
  const [pantry, setPantry] = useState([]); // Initialize state correctly

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
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
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

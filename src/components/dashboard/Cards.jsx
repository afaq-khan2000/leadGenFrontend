import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { AuthAPI } from "../../axios";
import GlobalDialog from "../global/GlobalDialog";
import InputField from "../global/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";

function Cards({
  data = [
    {
      title: "My Credits",
      value: 1000,
    },
    {
      title: "Total Leads",
      value: 100,
    },
    {
      title: "Unlocked Leads",
      value: 50,
    },
  ],
}) {
  const [loading, setLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const initialValues = {
    credits: 100,
  };

  const validationSchema = Yup.object({
    credits: Yup.number().min(100).required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    let data = {
      credits: values.credits,
      amount: values.credits * 1,
    };
    const res = await AuthAPI.checkoutSession(data);
    setLoading(false);
    window.location.href = res.data.data.session.url;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        my: 5,
        flexWrap: "wrap",
      }}
    >
      {data.map((card, index) => (
        <Card
          key={index}
          sx={{
            height: 150,
            width: { xs: "100%", md: "30%" },
            mb: { xs: 2, md: 0 },
            backgroundColor: "#f5f5f5",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="h4" color="text.primary">
              {card.value}
            </Typography>
            {card.title === "My Credits" && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, width: "100%", minWidth: "100%" }}
                // onClick={async () => {
                //   setLoading(true);
                //   const res = await AuthAPI.checkoutSession();
                //   setLoading(false);
                //   window.location.href = res.data.data.session.url;
                // }}
                onClick={() => setOpenDialog(true)}
              >
                Buy Credits
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
      <GlobalDialog
        title={"Buy Credits"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 2 }}>
          <InputField
            label="Credits"
            name="credits"
            formik={formik}
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", minWidth: "100%" }}
            onClick={formik.handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Buy ${formik.values.credits} Credits for AED ${formik.values.credits}`
            )}
          </Button>
        </Box>
      </GlobalDialog>
    </Box>
  );
}

export default Cards;

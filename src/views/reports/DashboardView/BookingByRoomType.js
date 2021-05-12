import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import api from '../../../api';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const initData = {
  datasets: [
    {
      data: [63, 15, 22],
      backgroundColor: [
        colors.indigo[500],
        colors.red[600],
        colors.orange[600]
      ],
      borderWidth: 8,
      borderColor: colors.common.white,
      hoverBorderColor: colors.common.white
    }
  ],
  labels: ['STD', 'VIP', 'VVIP']
};

const roomTypes = [
  {
    title: 'STD',
    value: 63,
    icon: LaptopMacIcon,
    color: colors.indigo[500]
  },
  {
    title: 'VIP',
    value: 15,
    icon: TabletIcon,
    color: colors.red[600]
  },
  {
    title: 'VVIP',
    value: 23,
    icon: PhoneIcon,
    color: colors.orange[600]
  }
];

const BookingByRoomType = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState(initData);
  const [labelRoomTypes, setLabelRoomTypes] = useState([]);

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const fetchBookingByRoomtype = async () => {
    const month = '2021-05';
    const res = await api.get(`/dashboard/${month}/bookings-by-roomtype`);
    console.log(res);

    const newDatasetItem = {
      data: [...Object.values(res.data).slice(1, 4)],
      backgroundColor: [
        colors.indigo[500],
        colors.red[600],
        colors.orange[600]
      ],
      borderWidth: 8,
      borderColor: colors.common.white,
      hoverBorderColor: colors.common.white
    };

    setData((prev) => ({ ...prev, datasets: [newDatasetItem] }));

    const total = parseInt(res.data.total, 10);

    const newRoomTypes = roomTypes.map((type) => {
      if (type.title === 'STD') {
        type.value = ((parseInt(res.data.std, 10) * 100) / total).toFixed(0);
      } else if (type.title === 'VIP') {
        type.value = ((parseInt(res.data.vip, 10) * 100) / total).toFixed(0);
      } else if (type.title === 'VVIP') {
        type.value = ((parseInt(res.data.vvip, 10) * 100) / total).toFixed(0);
      }

      return { ...type };
    });

    setLabelRoomTypes(newRoomTypes);
  };

  useEffect(() => {
    fetchBookingByRoomtype();
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="การให้บริการแยกตามประเภทห้อง" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {labelRoomTypes.map(({ color, title, value }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

BookingByRoomType.propTypes = {
  className: PropTypes.string
};

export default BookingByRoomType;

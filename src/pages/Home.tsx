import {
  Divider,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import HomeDate from '../components/HomeDate';
import HomeRow from '../components/HomeRow';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TimeBlockSettings from '../components/TimeBlockSettings';
import HomeTimeLine from '../components/HomeTimeLine';

const Home: FC = () => {
  const selTbId = useSelector(
    (state: RootState) => state.selectedTimeBlockSlice.id
  );

  const timeBlocks = useSelector(
    (state: RootState) => state.timeBlocksReducer.timeBlocks,
    (p, n) => {
      return (
        p.length === n.length &&
        p.find((tb) => tb.id === selTbId)?.timeStart ===
          n.find((tb) => tb.id === selTbId)?.timeStart &&
        p.find((tb) => tb.id === selTbId)?.timeEnd ===
          n.find((tb) => tb.id === selTbId)?.timeEnd
      );
    }
  );

  const dateArr: dayjs.Dayjs[] = new Array(25)
    .fill(dayjs().startOf('day'))
    .map((date, i) => {
      return date.set('hours', i);
    });
  dateArr.pop();

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const divRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    if (e.target === divRef.current) {
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: e.clientX + 2,
              mouseY: e.clientY - 6,
            }
          : null
      );
    } else {
      return;
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Paper square sx={{ pt: 3, pb: 10, pl: 2 }}>
      <Typography sx={{ opacity: 0.5 }} variant='h6' textAlign={'center'}>
        (Work in progress)
      </Typography>
      <HomeDate />
      <div ref={divRef} onContextMenu={handleContextMenu}>
        <Stack
          position={'relative'}
          direction={'column'}
          divider={<Divider sx={{ ml: 5 }} />}
        >
          {dateArr.map((date, index) => (
            <HomeRow
              key={index}
              date={date}
              timeBlocks={timeBlocks.filter((timeBlock) => {
                const timeStart = dayjs(timeBlock.timeStart);

                return date.hour() === timeStart.hour() ? timeBlock : undefined;
              })}
            />
          ))}
          <HomeTimeLine />
        </Stack>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference='anchorPosition'
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem>Add new Block</MenuItem>
        </Menu>
      </div>
      <TimeBlockSettings />
    </Paper>
  );
};

export default Home;

'use client';

import { commonColors, ScrollShadow } from '@heroui/react';
import { FC, useEffect, useMemo } from 'react';
import {
  ColorPicker as RACColorPicker,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from 'react-aria-components';
import { ColorSwatch } from './ColorSwatch';

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
  label?: string;
  ariaLabel?: string;
}

type CommonColor = typeof commonColors.blue | string;

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  setColor,
  label,
  ariaLabel,
}) => {
  const commonColorsArray = useMemo(() => {
    const commonColorsArray: string[] = [];

    for (const key in commonColors) {
      if (Object.prototype.hasOwnProperty.call(commonColors, key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const color = commonColors[key] as CommonColor; // TODO: refactor types

        if (key === 'blue') continue;

        if (typeof color === 'string') {
          commonColorsArray.push(color.toUpperCase());
        } else {
          commonColorsArray.push(color[500].toUpperCase());
        }
      }
    }

    commonColorsArray.unshift(commonColors.blue[500].toString());

    return commonColorsArray;
  }, []);

  useEffect(() => {
    return () => setColor(commonColorsArray[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonColorsArray]);

  return (
    <RACColorPicker>
      <div className='flex flex-col items-center gap-3'>
        <p className='text-nowrap'>{label || 'Select color'}</p>

        <ScrollShadow
          orientation='horizontal'
          as={ColorSwatchPicker}
          aria-label={ariaLabel ?? label} // TODO: localize
          value={color}
          // @ts-expect-error: ScrollShadow props conflicts with ColorSwatchPicker props specifically 'onChange'
          onChange={(color) => setColor(color.toString('hex'))} // TODO: use Color instead of string
          className='max-w-full flex items-center overflow-x-scroll light:bg-red-500 bg-default-100 rounded-medium p-2 no-scrollbar'
        >
          {commonColorsArray.map((commonColor, i) => (
            <ColorSwatchPickerItem
              key={commonColor}
              color={commonColor}
              className='outline-none cursor-pointer forced-color-adjust-none focus-visible:outline-focus'
            >
              <ColorSwatch
                i={i}
                isSelected={commonColor === color}
                // TODO: aria-label
              />
            </ColorSwatchPickerItem>
          ))}
        </ScrollShadow>
      </div>
    </RACColorPicker>
  );
};

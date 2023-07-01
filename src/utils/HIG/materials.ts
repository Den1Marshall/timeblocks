export interface Material {
  background: string;
  backgroundBlendMode: string;
  backdropFilter: string;
}

export const materialThickLight: Material = {
  background: 'rgba(153, 153, 153, 0.97)',
  backgroundBlendMode: 'COLOR_DODGE, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialThickDark: Material = {
  background: 'rgba(37, 37, 37, 0.90)',
  backgroundBlendMode: 'OVERLAY, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialRegularLight: Material = {
  background: 'rgba(179, 179, 179, 0.82)',
  backgroundBlendMode: 'COLOR_DODGE, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialRegularDark: Material = {
  background: 'rgba(37, 37, 37, 0.82)',
  backgroundBlendMode: 'OVERLAY, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialThinLight: Material = {
  background: 'rgba(166, 166, 166, 0.70)',
  backgroundBlendMode: 'COLOR_DODGE, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialThinDark: Material = {
  background: 'rgba(37, 37, 37, 0.70)',
  backgroundBlendMode: 'OVERLAY, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialUltrathinLight: Material = {
  background: 'rgba(191, 191, 191, 0.44)',
  backgroundBlendMode: 'COLOR_DODGE, NORMAL',
  backdropFilter: 'blur(25px)',
};

export const materialUltrathinDark: Material = {
  background: 'rgba(37, 37, 37, 0.55)',
  backgroundBlendMode: 'OVERLAY, NORMAL',
  backdropFilter: 'blur(25px)',
};

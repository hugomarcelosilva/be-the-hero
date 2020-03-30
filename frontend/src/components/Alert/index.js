import React from 'react';
import ButterToast, { Cinnamon } from 'butter-toast';

const Alert = ({ type = 'error', ...props }) => {
  let scheme;

  if (type === 'success') {
    scheme = Cinnamon.Crisp.SCHEME_BLUE;
  } else if (type === 'error') {
    scheme = Cinnamon.Crisp.SCHEME_RED;
  } else {
    scheme = Cinnamon.Crisp.SCHEME_ORAGE;
  }

  ButterToast.raise({
    content: (
      <Cinnamon.Crisp
        scheme={scheme}
        content={() => <div>You can put basically anything here.</div>}
        {...props}
      />
    ),
  });
};

export default Alert;

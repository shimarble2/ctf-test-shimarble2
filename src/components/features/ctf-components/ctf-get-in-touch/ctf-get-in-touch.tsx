import { Theme, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { ContactFormFieldsFragment } from './__generated/ctf-get-in-touch.generated';

// import { Author } from '@src/components/features/author';
// import { CardLeadership } from '@src/components/features/card-leadership';
// import { CardPerson } from '@src/components/features/card-person';
import { useLayoutContext } from '@src/layout-context';
import { CtfRichtext } from '../ctf-richtext/ctf-richtext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(18),
    paddingTop: (props: BusinessInfoFieldsFragment) =>
      props.name || props.shortDescription ? 0 : theme.spacing(18),
    '& .MuiContainer-root + .ComponentInfoBlock': {
      marginTop: theme.spacing(18),
    },
    '& .ComponentInfoBlock + .MuiContainer-root': {
      marginTop: theme.spacing(18),
    },
  },
  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '126.2rem',
  },
  containerNarrow: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '77rem',
  },
  hero: {
    marginBottom: theme.spacing(18),
    position: 'relative',
  },
  heroBg: {
    backgroundColor: '#000',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      bottom: 0,
      content: '""',
      display: 'block',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
  },
  heroInner: {
    alignItems: 'center',
    color: '#00c29f',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '55rem',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8),
    position: 'relative',
    textAlign: 'center',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(16),
      paddingTop: theme.spacing(16),
    },
    '@media (min-height: 600px)': {
      minHeight: '59rem',
    },
  },
  title: {
    [theme.breakpoints.up('md')]: {
      fontSize: '4.5rem',
    },
  },
  subtitle: {
    fontSize: '2.5rem',
    marginTop: theme.spacing(3),
    color: '#fff',
  },
}));

interface CtfPersonPropsInterface extends ContactFormFieldsFragment {
  previousComponent: string | null;
}

// export const CtfPerson = (props: CtfPersonPropsInterface) => {
//   const layout = useLayoutContext();
//   const classes = useStyles();
//   const isLeadership = props.cardStyle === false;

//   return layout.parent === 'quote' ? (
//     <>
//     <div className={classes.root} style={{ maxWidth: layout.containerWidth }}>
//       <Author {...props} />
//     </div>
//     <div>
//       <p>cft-person.tsx :CtfPerson</p>
//     </div>
//     </>

//   ) : (
//     <Container maxWidth={false}>
//       <div className={classes.root} style={{ maxWidth: layout.containerWidth }}>
//         {isLeadership ? <CardLeadership {...props} /> : <CardPerson {...props} />}
//         <p>tsx</p>
//       </div>
//     </Container>
//   );
// };

export const CftGetInTouch = (props: any) => {
  const layout = useLayoutContext();
  const classes = useStyles(props);
  const {
    body,
    name,
    shortDescription,
    featuredImage,
    sys: { id },
  } = props;

  console.log('??>>ctf-get-in-touch.tsx:page', props);
  // 各プロパティの内容をコンソールに出力
  console.log('??>>ctf-get-in-touch.tsx:body', body);
  console.log('??>>ctf-get-in-touch.tsx:name', name);
  console.log('??>>ctf-get-in-touch.tsx:shortDescription', shortDescription);
  console.log('??>>ctf-get-in-touch.tsx:featuredImage', featuredImage);
  console.log('??>>ctf-get-in-touch.tsx:sys.id', id);

  const handleSubmit = event => {
    event.preventDefault();
    // フォームの送信処理をここに追加
    console.log('Form submitted');
  };

  return (
    <>
<div className={classes.hero}>
          <div
            className={classes.heroBg}
            // style={{
            //   backgroundImage: `url(${backgroundImage})`,
            // }}
          />
          <Container maxWidth={false}>
            <div className={clsx(classes.containerNarrow, classes.heroInner)}>
              {name && (
                <Typography
                  variant="h1"
                  className={classes.title}
                >
                  {name}
                </Typography>
              )}
              {shortDescription && (
                <Typography
                  className={classes.subtitle}

                >
                  {shortDescription}
                </Typography>
              )}
            </div>
          </Container>
        </div>

      <div>
        <CtfRichtext
          {...body}
          // containerClassName={classes.container}
          // gridClassName={classes.containerNarrow}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div>
          <label htmlFor="yourname">Your Name</label>
          <input type="text" id="yourname" name="yourname" required />
        </div>
        <div>
          <label htmlFor="email">Your E-mail</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

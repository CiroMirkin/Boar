import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Fácil de usar',
    Svg: require('@site/static/img/undraw_upgrade_re_gano.svg').default,
    description: (
      <>
       Le ayudamos a gestionar de trabajo de una forma sencilla y efectiva.
      </>
    ),
  },
  {
    title: 'Sin anuncios',
    Svg: require('@site/static/img/undraw_learning_sketching.svg').default,
    description: (
      <>
        Permitimos que se enfoque en sus tareas sin distraerlo con anuncios.
      </>
    ),
  },
  {
    title: 'Gratis',
    Svg: require('@site/static/img/undraw_join_re_w1lh.svg').default,
    description: (
      <>
        No tiene que pagar para utilizar nuestra aplicación y tampoco almacenamos información.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

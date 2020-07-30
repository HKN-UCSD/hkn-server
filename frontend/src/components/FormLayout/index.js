import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Grid, Typography, Divider } from '@material-ui/core';

import Button from '../buttons';
import styles from './styles';

function TitleSectionComponent({ title, readOnly, editEndpoint, classes }) {
  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='h4'>{title}</Typography>
        </Grid>
        {readOnly && (
          <Grid item>
            <Grid
              container
              alignItems='center'
              className={classes.editButtonContainer}
            >
              <Grid item>
                <Button
                  size='small'
                  primary
                  positive
                  to={editEndpoint}
                  component={Link}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

TitleSectionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  editEndpoint: PropTypes.string,
};

TitleSectionComponent.defaultProps = {
  readOnly: false,
  editEndpoint: '',
};

function ActionSection({
  onSubmit,
  submitButtonText,
  onCancel,
  cancelButtonText,
}) {
  return (
    <Grid item>
      <Grid container justify='flex-start' spacing={2} wrap='nowrap'>
        <Grid item>
          <Button secondary negative onClick={onCancel}>
            {cancelButtonText}
          </Button>
        </Grid>
        <Grid item>
          <Button primary positive onClick={onSubmit}>
            {submitButtonText}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

ActionSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
};

function SectionComponent({ title, Content, classes }) {
  return (
    <Grid item>
      <Grid container spacing={2} wrap='nowrap'>
        <Grid item xs={4} className={classes.sectionTitle}>
          <Typography variant='h6' color='textSecondary'>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Content />
        </Grid>
      </Grid>
    </Grid>
  );
}

SectionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  Content: PropTypes.oneOfType([React.Component, PropTypes.func]).isRequired,
};

const Section = withStyles(styles)(SectionComponent);
const TitleSection = withStyles(styles)(TitleSectionComponent);

export default function FormLayout({
  title,
  readOnly,
  editEndpoint,
  sections,
  onSubmit,
  submitButtonText,
  onCancel,
  cancelButtonText,
}) {
  return (
    <Grid container wrap='nowrap' direction='column' spacing={2}>
      <TitleSection
        title={title}
        editEndpoint={editEndpoint}
        readOnly={readOnly}
      />
      <Grid item>
        <Divider />
      </Grid>

      {sections
        .map(section => (
          <Section
            key={section.title}
            title={section.title}
            Content={section.Content}
          />
        ))
        .reduce((prev, curr) => [
          prev,
          <Grid item key={`${prev.key}-${curr.key}-divider`}>
            <Divider />
          </Grid>,
          curr,
        ])}

      {readOnly === false && (
        <ActionSection
          onSubmit={onSubmit}
          submitButtonText={submitButtonText}
          onCancel={onCancel}
          cancelButtonText={cancelButtonText}
        />
      )}
    </Grid>
  );
}

FormLayout.propTypes = {
  title: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  editEndpoint: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      Content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  onCancel: PropTypes.func,
  cancelButtonText: PropTypes.string,
};

FormLayout.defaultProps = {
  readOnly: false,
  editEndpoint: '',
  onSubmit: null,
  onCancel: null,
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
};

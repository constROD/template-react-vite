import * as createSampleDataModule from '@/features/sample/_data/create-sample';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AddSampleForm } from './add-sample-form';

const renderComponentUnderTest = () => {
  const view = render(<AddSampleForm />);

  const events = {
    createSampleData: vi.spyOn(createSampleDataModule, 'createSampleData'),
  };
  const elements = {
    submitButton: () => screen.getByRole('button', { name: 'Add Sample' }),
    emailInput: () => screen.getByLabelText('Email'),
    nameInput: () => screen.getByLabelText('Name'),
    descriptionInput: () => screen.getByLabelText('Description'),
  };

  return {
    events,
    elements,
    ...view,
  };
};

describe('AddSampleForm', () => {
  it('should render properly', () => {
    const { elements } = renderComponentUnderTest();

    expect(elements.submitButton()).toBeInTheDocument();
    expect(elements.emailInput()).toBeInTheDocument();
    expect(elements.nameInput()).toBeInTheDocument();
    expect(elements.descriptionInput()).toBeInTheDocument();
  });

  it('can fill up all fields with valid data and submit', async () => {
    const { events, elements } = renderComponentUnderTest();

    const mockFormData = {
      email: 'test@gmail.com',
      name: 'Test Name',
      description: 'Test Description',
    };

    fireEvent.change(elements.emailInput(), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(elements.nameInput(), {
      target: { value: mockFormData.name },
    });
    fireEvent.change(elements.descriptionInput(), {
      target: { value: mockFormData.description },
    });

    expect(elements.emailInput()).toHaveValue(mockFormData.email);
    expect(elements.nameInput()).toHaveValue(mockFormData.name);
    expect(elements.descriptionInput()).toHaveValue(mockFormData.description);

    await userEvent.click(elements.submitButton());

    expect(events.createSampleData).toHaveBeenCalledWith({
      title: mockFormData.email,
      body: mockFormData.description,
      userId: 1,
    });
  });

  it('should not allow to submit if the form validation is not satisfied', async () => {
    const { events, elements } = renderComponentUnderTest();

    const mockFormData = {
      email: 'test',
      name: '',
      description: '',
    };

    fireEvent.change(elements.emailInput(), {
      target: { value: mockFormData.email },
    });
    fireEvent.change(elements.nameInput(), {
      target: { value: mockFormData.name },
    });
    fireEvent.change(elements.descriptionInput(), {
      target: { value: mockFormData.description },
    });

    expect(elements.emailInput()).toHaveValue(mockFormData.email);
    expect(elements.nameInput()).toHaveValue(mockFormData.name);
    expect(elements.descriptionInput()).toHaveValue(mockFormData.description);

    await userEvent.click(elements.submitButton());

    expect(events.createSampleData).not.toHaveBeenCalled();
  });
});

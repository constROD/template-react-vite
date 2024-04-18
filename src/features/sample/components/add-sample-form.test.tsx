import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, type Mock } from 'vitest';
import { AddSampleForm } from './add-sample-form';

type RenderComponentUnderTestProps = {
  onSubmit?: Mock;
};

describe('AddSampleForm', () => {
  const renderComponentUnderTest = ({ onSubmit }: RenderComponentUnderTestProps = {}) => {
    const mockOnSubmit = onSubmit ?? vi.fn();

    const view = render(<AddSampleForm onSubmit={mockOnSubmit} />);

    const events = {
      onSubmit: mockOnSubmit,
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

    expect(events.onSubmit).toHaveBeenCalledWith(mockFormData, expect.any(Object));
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

    expect(events.onSubmit).not.toHaveBeenCalled();
  });
});

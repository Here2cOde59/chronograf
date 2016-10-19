package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	strfmt "github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/validate"
)

// Layouts layouts
// swagger:model Layouts
type Layouts struct {

	// layouts
	// Required: true
	Layouts []*Layout `json:"layouts"`
}

// Validate validates this layouts
func (m *Layouts) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateLayouts(formats); err != nil {
		// prop
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *Layouts) validateLayouts(formats strfmt.Registry) error {

	if err := validate.Required("layouts", "body", m.Layouts); err != nil {
		return err
	}

	for i := 0; i < len(m.Layouts); i++ {

		if swag.IsZero(m.Layouts[i]) { // not required
			continue
		}

		if m.Layouts[i] != nil {

			if err := m.Layouts[i].Validate(formats); err != nil {
				return err
			}
		}

	}

	return nil
}
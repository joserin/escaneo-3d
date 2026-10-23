import { useState, type FormEvent } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';

export default function QuoteForm() {
  const [quoteServices, setQuoteServices] = useState(["Escaneo Láser"]);
  const [quoteArea, setQuoteArea] = useState(2500);
  const [quoteFile, setQuoteFile] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  const toggleQuoteService = (service: string) => {
    setQuoteServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
    setQuoteSent(false);
  };

  const submitQuote = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    // Opcional: Agregar los servicios seleccionados y el área al FormData si no son inputs nativos
    formData.append('services', JSON.stringify(quoteServices));
    formData.append('area', String(quoteArea));

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setQuoteSent(true);
        formElement.reset(); // Limpia el formulario si deseas
      } else {
        alert('Hubo un error al enviar la solicitud. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="quote-grid">
      <div className="quote-copy">
        <span className="section-kicker">
          <i></i>
          Solicitud de cotización
        </span>
        <span className="quote-code">05 / INICIAR PROYECTO</span>
        <h2>
          ¿Listo para digitalizar <span>tu planta?</span>
        </h2>
        <p className="quote-lead">
          Obtén un presupuesto ajustado al alcance, tamaño y necesidades
          técnicas de tu proyecto.
        </p>

        <div className="response-guarantee">
          <span className="guarantee-icon">
            <Icon name="clock" size={23} />
          </span>
          <div>
            <small>GARANTÍA DE RESPUESTA</small>
            <strong>Evaluación inicial en menos de 24 horas.</strong>
            <p>
              Un especialista revisará la información y te contactará con
              los siguientes pasos.
            </p>
          </div>
        </div>

        <div className="direct-contact">
          <span>CONTACTO DIRECTO</span>
          <div>
            <Icon name="mail" size={18} />
            <p>
              <small>CORREO DE PROYECTOS</small>
              <b>proyectos@vector3d.com</b>
            </p>
          </div>
          <div>
            <Icon name="phone" size={18} />
            <p>
              <small>ATENCIÓN COMERCIAL</small>
              <b>+52 55 8421 3090</b>
            </p>
          </div>
        </div>
      </div>

      <form className="quote-form-card" onSubmit={submitQuote}>
        <div className="form-card-head">
          <div>
            <span>BRIEF / NUEVO PROYECTO</span>
            <strong>Cuéntanos sobre tu planta</strong>
          </div>
          <b>RFQ–05</b>
        </div>

        <fieldset className="form-group">
          <legend>
            <span>01</span>
            Servicio requerido
            <small>SELECCIÓN MÚLTIPLE</small>
          </legend>
          <div className="service-chips">
            {["Escaneo Láser", "Modelado 3D", "Planos 2D"].map(
              (service) => (
                <Button
                  key={service}
                  variant="secondary"
                  className={
                    quoteServices.includes(service) ? "is-selected" : ""
                  }
                  onClick={() => toggleQuoteService(service)}
                  type="button"
                >
                  <span className="chip-check">
                    {quoteServices.includes(service) && (
                      <Icon name="check" size={13} />
                    )}
                  </span>
                  {service}
                </Button>
              ),
            )}
          </div>
        </fieldset>

        <fieldset className="form-group">
          <legend>
            <span>02</span>
            Alcance aproximado
            <small>INFORMACIÓN TÉCNICA</small>
          </legend>
          <div className="area-field">
            <label htmlFor="project-area">Área aproximada</label>
            <div>
              <Field
                id="project-area"
                max="100000"
                min="100"
                onChange={(event) => {
                  setQuoteArea(Number(event.currentTarget.value));
                  setQuoteSent(false);
                }}
                step="100"
                type="number"
                value={quoteArea}
              />
              <span>m²</span>
            </div>
          </div>
          <Field
            aria-label="Área aproximada en metros cuadrados"
            className="area-range"
            max="10000"
            min="100"
            onChange={(event) => {
              setQuoteArea(Number(event.currentTarget.value));
              setQuoteSent(false);
            }}
            step="100"
            type="range"
            value={Math.min(quoteArea, 10000)}
          />
          <div className="range-labels">
            <span>100 m²</span>
            <span>10,000+ m²</span>
          </div>

          <label className="upload-field">
            <Field
              accept=".jpg,.jpeg,.png,.pdf,.dwg"
              className="file-input"
              onChange={(event) => {
                setQuoteFile(event.currentTarget.files?.[0]?.name ?? "");
                setQuoteSent(false);
              }}
              type="file"
            />
            <span className="upload-icon">
              <Icon name="upload" size={20} />
            </span>
            <span>
              <strong>
                {quoteFile || "Adjuntar fotos, planos o ubicación"}
              </strong>
              <small>JPG, PNG, PDF o DWG · MÁX. 20 MB</small>
            </span>
            <b>{quoteFile ? "CAMBIAR" : "EXPLORAR"}</b>
          </label>
        </fieldset>

        <fieldset className="form-group contact-group">
          <legend>
            <span>03</span>
            Datos de contacto
            <small>RESPUESTA COMERCIAL</small>
          </legend>
          <label>
            <span>Nombre completo</span>
            <Field
              autoComplete="name"
              name="name"
              placeholder="Nombre Apellido"
              required
            />
          </label>
          <label>
            <span>Correo corporativo</span>
            <Field
              autoComplete="email"
              name="email"
              placeholder="nombre@empresa.com"
              required
              type="email"
            />
          </label>
          <label>
            <span>Teléfono</span>
            <Field
              autoComplete="tel"
              name="phone"
              placeholder="+58 000 000 0000"
              required
              type="tel"
            />
          </label>
          <label>
            <span>Empresa</span>
            <Field
              autoComplete="organization"
              name="company"
              placeholder="Nombre de la compañía"
              required
            />
          </label>
        </fieldset>

        <Button
          variant="submit"
          className={quoteSent ? "quote-submit is-sent" : "quote-submit"}
          disabled={quoteServices.length === 0}
          type="submit"
        >
          {quoteSent ? (
            <>
              <Icon name="check" size={19} />
              Solicitud recibida
            </>
          ) : (
            <>
              Enviar Solicitud de Cotización
              <Icon name="arrow" size={19} />
            </>
          )}
        </Button>
        <p className="form-privacy">
          Al enviar aceptas que nuestro equipo te contacte únicamente para
          evaluar este proyecto.
        </p>
        {quoteSent && (
          <div className="form-success" role="status">
            <span>
              <Icon name="check" size={17} />
            </span>
            <p>
              <strong>Brief registrado correctamente.</strong>
              Te contactaremos en menos de 24 horas hábiles.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
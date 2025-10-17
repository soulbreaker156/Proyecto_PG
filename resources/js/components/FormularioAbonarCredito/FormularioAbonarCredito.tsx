export default function FormularioAbonarCredito() {
    return (
        <form>
            <div>
                <label htmlFor="monto">Monto a Abonar:</label>
                <input type="number" id="monto" name="monto" step="0.01" min="0" required />
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <input type="text" id="descripcion" name="descripcion" maxLength={100} required />
            </div>
            <button type="submit">Abonar Crédito</button>
        </form>
    );
}

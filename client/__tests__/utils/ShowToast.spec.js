import showToast from '../../utils/ShowToast';

describe('showToast function', () => {
  it('should display a warning toast', () => {
    const warningToast = showToast('warning message', 'warning');
    expect(warningToast.length).toBe(1);
  });
  it('should display a success toast', () => {
    const successToast = showToast('success message', 'success');
    expect(successToast.length).toBe(1);    
  });
  it('should display an error toast', () => {
    const errorToast = showToast('error message', 'error');
    expect(errorToast.length).toBe(1);    
  });
  it('should display an info toast', () => {
    const infoToast = showToast('error message', 'info');
    expect(infoToast.length).toBe(1);
  });
  it('should remove a toast', () => {
    const removeToast = showToast('error message', 'remove');
    expect(removeToast).toBeUndefined();    
  });
  it('should remove a toast', () => {
    const clearToast = showToast('error message', 'clear');
    expect(clearToast).toBeUndefined();
  });
});

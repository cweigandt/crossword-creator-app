import { useCallback } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../actions/modalActions';
import Modal from './Modal';

import '../../styles/modal/RestoreStateModal.css';
import { restoreState } from '../../actions/commonActions';

type PropsType = {
  id: number;
};

const hasRequiredProps = (object: object, ...varProps: string[]): boolean => {
  return varProps.reduce((accum, prop) => {
    return accum && object.hasOwnProperty(prop);
  }, true as boolean);
};

const RestoreStateModal = ({ id }: PropsType) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(formRef.current || undefined);
    let inputString = formData.get('state') as string;
    const jsonPuzzle = JSON.parse(inputString);
    const hasAllProps = hasRequiredProps(
      jsonPuzzle,
      'id',
      'width',
      'height',
      'template',
      'solution',
      'elements'
    );

    // TODO - verify types of each property
    //   id: number;
    // width: number;
    // height: number;
    // template: TemplateType;

    // solution: SolutionType;
    // elements: ElementType[];

    if (hasAllProps) {
      dispatch(restoreState(jsonPuzzle));
      dispatch(hideModal(id));
    }
  };

  const handleClose = useCallback(() => {
    dispatch(hideModal(id));
  }, [dispatch, id]);

  return (
    <Modal classes='restore-state-modal'>
      <div>Load Puzzle</div>
      <div className='modal-close-button' onClick={handleClose}>
        ❌
      </div>
      <form
        id='restoreStateForm'
        name='restoreStateForm'
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div className='form-group'>
          <textarea
            className='form-control'
            data-test-id='restore-state-textarea'
            rows={20}
            cols={40}
            id='state'
            onKeyDown={(e) => {
              if (e.keyCode === 13 || e.key === 'Enter') {
                e.preventDefault();
                return false;
              }
            }}
            name='state'
          />
        </div>
        <button
          type='submit'
          id='restoreStateSubmit'
          data-test-id='restore-state-submit'
          className='btn'
        >
          Load
        </button>
      </form>
    </Modal>
  );
};

export default RestoreStateModal;

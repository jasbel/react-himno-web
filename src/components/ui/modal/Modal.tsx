import { cn } from '@/lib/utils';
import { buttonVariants } from '../button';
import './Modal.css'; // O usa estilos en línea si prefieres
interface Props {
    isOpen: boolean,
    onAccept: Function,
    onClose: Function,
    title: string,
    children?: React.ReactNode;
    trigger: React.ReactNode;
}

export default function Modal({ isOpen, onAccept, onClose, children, title, trigger }: Props) {
    if (!isOpen) return (
        <div>
            <div className='modal-trigger'>
                {trigger}
            </div>
        </div>
    );

    return (
        <div>
            <div className='modal-trigger'>
                {trigger}
            </div>


            <div className="modal-backdrop" onClick={() => onClose()}>

                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={() => onClose()}>✖</button>
                    <div className="modal-header" >
                        <h2>{title}</h2>
                    </div>
                    <div className='modal-body'>

                        {children}
                    </div>
                    <div className="modal-footer">
                        <button
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "mr-1 mt-2 sm:mt-0 modal-btn",
                            )}
                            onClick={() => onAccept()}>Aceptar</button>
                        <button className={cn(
                            buttonVariants({ variant: "outline" }),
                            "ml-1 mt-2 sm:mt-0 modal-btn",
                        )} onClick={() => onAccept()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

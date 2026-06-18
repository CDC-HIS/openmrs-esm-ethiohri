import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  InlineLoading,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@carbon/react";
import { showSnackbar } from "@openmrs/esm-framework";
import { tansferOut } from "../../api/api";

interface DeleteEncounterModalProps {
  closeDeleteModal: () => void;
  encounterUuid: any;
  patientUuid?: string;
  onConfirmDelete: () => void;
}

const DeleteEncounterModal: React.FC<DeleteEncounterModalProps> = ({
  closeDeleteModal,
  encounterUuid,
  onConfirmDelete,
}) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    const abortController = new AbortController();

    tansferOut(abortController, encounterUuid)
      .then((res) => {
        if (res.ok) {
          closeDeleteModal(); // Close the modal
          onConfirmDelete();
          showSnackbar({
            isLowContrast: true,
            kind: "success",
            title: t("transferred", "Transferred out Patient successfully"),
          });
        }
      })
      .catch((error) => {
        showSnackbar({
          isLowContrast: false,
          kind: "error",
          title: t(
            "errorDeletingTransferring",
            "Error Transferring out Patient",
          ),
          subtitle: error?.message,
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
    return () => {
      abortController.abort();
    };
  }, [encounterUuid, closeDeleteModal, onConfirmDelete, t]);

  return (
    <div>
      <ModalHeader
        closeModal={closeDeleteModal}
        title={t("transferOutPatient", "Transfer Out Patient")}
      />
      <ModalBody>
        <p>
          {t(
            "transferOutPatientConfirmation",
            "Are you sure you want to transfer out this patient ?",
          )}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeDeleteModal}>
          {t("cancel", "Cancel")}
        </Button>
        <Button kind="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <InlineLoading
              description={t("transferring", "Transferring ") + "..."}
            />
          ) : (
            <span>{t("delete", "Transfer Out Patient")}</span>
          )}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default DeleteEncounterModal;
